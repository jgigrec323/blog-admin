"use client";
import CustomCard from "@/components/CustomCard";
import CustomLoader from "@/components/CustomLoader";
import PopularPostsCard from "@/components/PopularPostsCard";
import RecentPostsCard from "@/components/RecentPostsCard";
import Title from "@/components/Title";
import ViewsGraph from "@/components/ViewsGraph";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const monthlyViews = [10, 20, 30, 25, 35, 50, 45, 60, 70, 90, 100, 120];

  const [stats, setStats] = useState({});
  const [recentPosts, setRecentPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    const fetchRecentPosts = async () => {
      try {
        const response = await axios.get("/api/recent-posts");
        setRecentPosts(response.data);
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      }
    };

    const fetchPopularPosts = async () => {
      try {
        const response = await axios.get("/api/popular-posts");
        setPopularPosts(response.data);
      } catch (error) {
        console.error("Error fetching popular posts:", error);
      }
    };

    const fetchData = async () => {
      await Promise.all([
        fetchStats(),
        fetchRecentPosts(),
        fetchPopularPosts(),
      ]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const statistiques = [
    {
      value: stats.totalViews,
      title: "Total views",
      analytic: "+20%",
    },
    {
      value: stats.totalPosts,
      title: "Total posts",
      analytic: "",
    },
    {
      value: stats.totalComments,
      title: "Total comments",
      analytic: "+20%",
    },
    {
      value: stats.totalShares,
      title: "Total shares",
      analytic: "+20%",
    },
  ];

  return (
    <div className="relative">
      <Title>Dashboard</Title>
      {!isLoading ? (
        <section>
          <section className="mt-4 grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
            {statistiques.map((stat, i) => (
              <CustomCard
                key={i}
                number={stat.value}
                title={stat.title}
                analytic={stat.analytic}
              />
            ))}
          </section>
          <section className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-6 h-[500px]">
            <div className="sm:col-span-4">
              <ViewsGraph title={"Monthly Views"} data={monthlyViews} />
            </div>
            <div className="sm:col-span-2 flex flex-col justify-between">
              <RecentPostsCard title={"Recent Posts"} posts={recentPosts} />
              <PopularPostsCard title={"Popular Posts"} posts={popularPosts} />
            </div>
          </section>
        </section>
      ) : (
        <CustomLoader />
      )}
    </div>
  );
}

export default Dashboard;
