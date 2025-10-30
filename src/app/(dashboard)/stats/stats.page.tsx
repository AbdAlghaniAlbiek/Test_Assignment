"use client";

import PageContent from "@/components/content/content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  articlesItems,
  categoriesItems,
} from "@/helpers/stores/articles.store";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function StatsPage() {
  const articlesPerCategory = {};
  articlesItems.forEach((art) => {
    if (!articlesPerCategory[art.category.name]) {
      articlesPerCategory[art.category.name] = 1;
    } else {
      articlesPerCategory[art.category.name] += 1;
    }
  });

  const viewsPerDay = {};
  articlesItems.forEach((art) => {
    art.viewedAt.forEach((artV) => {
      const date = artV.split("T");
      const month = date[0].split("-")[1];
      const day = date[0].split("-")[2];
      if (!viewsPerDay[`${month}/${day}`]) {
        viewsPerDay[`${month}/${day}`] = 1;
      } else {
        viewsPerDay[`${month}/${day}`] += 1;
      }
    });
  });

  const { t } = useTranslation("stats");

  const [articlesPerCategoryState, setState] = React.useState({
    series: [
      {
        name: "Inflation",
        data: Object.values(articlesPerCategory).map((art) => art),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          // return val + "%";
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },

      xaxis: {
        categories: Object.keys(articlesPerCategory).map((cat) => cat),
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            // return val + "%";
            return val;
          },
        },
      },
      title: {
        text: t("ARTICLES_PER_CATEGORY"),
        floating: true,
        offsetY: 330,
        align: "center",
        style: {
          color: "#444",
        },
      },
    },
  });

  const [viewsPerDayState, setStatee] = React.useState({
    series: [
      {
        name: "Inflation",
        data: Object.values(viewsPerDay).map((art) => art),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          // return val + "%";
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },

      xaxis: {
        categories: Object.keys(viewsPerDay).map((cat) => cat),
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            // return val + "%";
            return val;
          },
        },
      },
      title: {
        text: t("VIEWS_PER_DAY"),
        floating: true,
        offsetY: 330,
        align: "center",
        style: {
          color: "#444",
        },
      },
    },
  });

  const [startDate, setStartDate] = useState(new Date());

  return (
    <PageContent>
      <Tabs defaultValue="tab-1">
        <TabsList>
          <TabsTrigger value="tab-1">{t("ARTICLES_PER_CATEGORY")}</TabsTrigger>
          <TabsTrigger value="tab-2">{t("VIEWS_PER_DAY")}</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">
          <ReactApexChart
            options={articlesPerCategoryState.options}
            series={articlesPerCategoryState.series}
            type="bar"
            height={350}
          />
        </TabsContent>
        <TabsContent value="tab-2" className="flex flex-col">
          <ReactApexChart
            options={viewsPerDayState.options}
            series={viewsPerDayState.series}
            type="bar"
            height={350}
          />
        </TabsContent>

        {/* <DatePicker
          className="absolute border bottom-0 left-[50%] translate-x-[-50%]"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        /> */}
      </Tabs>
    </PageContent>
  );
}

export default StatsPage;
