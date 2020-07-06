<template>
  <Layout class="layout">
    <Tabs :data-source="recordDataSource" class-prefix="type" :value.sync="type" />
    <!-- <Tabs :data-source="intervalDataSource" class-prefix="interval" /> -->
    <v-chart ref="echarts" v-if="showChart" class="echarts" :options="chartOption" />
    <ol class="list" v-if="groupedList.length > 0">
      <li class="day-detail" v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">
          {{ beautify(group.title) }}
          <span>￥{{ group.total }}</span>
        </h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <div>
              <span>{{ tagString(item.tags) }}</span>
            </div>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">~目前没有相关记录噢</div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import intervalList from "@/constants/intervalList";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import ECharts from "vue-echarts/components/ECharts.vue";
import "echarts/lib/chart/bar";

@Component({
  components: { Tabs, "v-chart": ECharts }
})
export default class extends Vue {
  type = "-";
  showChart = false;
  chartOption = {};
  recordTypeList = recordTypeList;
  recordDataSource = recordTypeList;
  intervalDataSource = intervalList;
  @Watch("type", { immediate: true })
  onTypeChanged(val: string, oldVal: string) {
    const xAxisData = <any>[];
    const seriesData = <any>[];
    const _chartData = <any>{};
    this.recordList.forEach((record: RecordItem) => {
      if (record.type === this.type) {
        const tagName = record.tags[0].name;
        const amount = (_chartData[tagName] || 0) + record.amount;
        _chartData[tagName] = amount;
      }
    });

    this.showChart = Object.keys(_chartData).length > 0;
    this.chartOption = {
      title: {
        text: "ECharts 入门示例",
        show: true
      },
      tooltip: {},
      legend: {
        data: ["销量"]
      },
      calculable: true,
      grid: {
        top: "40px",
        left: "1%",
        right: "10%",
        bottom: "20px",
        containLabel: true
      },
      yAxis: [
        {
          type: "value",
          name: "收入(元)"
        }
      ],
      xAxis: {
        data: Object.keys(_chartData)
      },
      series: [
        {
          name: "销量",
          type: "bar",
          barWidth: 30,
          data: Object.values(_chartData)
        }
      ]
    };
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const { recordList } = this;
    if (recordList.length === 0) {
      return [];
    }

    const newList = clone(recordList)
      .filter(r => {
        return r.type === this.type;
      })
      .sort(
        (a, b) =>
          dayjs(b.createdDate).valueOf() - dayjs(a.createdDate).valueOf()
      );
    if (newList.length === 0) {
      return [];
    }
    type Result = { title: string; total?: number; items: RecordItem[] }[];
    const result: Result = [
      {
        title: dayjs(newList[0].createdDate).format("YYYY-MM-DD"),
        items: [newList[0]]
      }
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdDate), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdDate).format("YYYY-MM-DD"),
          items: [current]
        });
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    return result;
  }
  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags.map(v => v.name).join(",");
  }
  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }

  beforeCreate() {
    this.$store.commit("fetchRecord");
  }
}
</script>

<style lang="scss" scoped>
.layout {
  $borderColor: rgb(230, 230, 230);
  .echarts {
    width: 100%;
    max-height: 40%;
  }
  .list {
    flex: 1;
    height: 100%;
    overflow: auto;
    .day-detail {
      border-bottom: 1px solid $borderColor;
    }
    .title {
      @extend %item;
    }
    .record {
      text-indent: 10px;
      background: white;
      @extend %item;
    }
    .notes {
      margin-right: auto;
      margin-left: 16px;
      color: #999;
    }
  }
  .noResult {
    padding: 16px;
    text-align: center;
    color: rgb(178, 157, 157);
  }
}
::v-deep {
  .type-tabs-item {
    background: white;
    &.selected {
      background: #000;
      color: #fff;
      &::after {
        display: none;
      }
    }
  }
  .interval-tabs-item {
    height: 48px;
  }
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
</style>
