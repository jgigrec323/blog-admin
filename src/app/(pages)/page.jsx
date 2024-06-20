import CustomCard from "@/components/CustomCard";
import PopularPostsCard from "@/components/PopularPostsCard";
import RecentPostsCard from "@/components/RecentPostsCard";
import Title from "@/components/Title";
import ViewsGraph from "@/components/ViewsGraph";
import React from "react";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const monthlyViews = [10, 20, 30, 25, 35, 50, 45, 60, 70, 90, 100, 120];
  return (
    <div>
      <Title>Dashboard</Title>
      <section className="mt-4 grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        <CustomCard
          number={24585}
          title={"Total views"}
          analytic={"+20%"}
        ></CustomCard>
        <CustomCard
          number={585}
          title={"Total posts"}
          analytic={"+20%"}
        ></CustomCard>
        <CustomCard
          number={2020}
          title={"Total comments"}
          analytic={"+20%"}
        ></CustomCard>
        <CustomCard
          number={87}
          title={"Total shares"}
          analytic={"+20%"}
        ></CustomCard>
      </section>
      <section className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-6 h-[500px]">
        <div className="sm:col-span-4">
          <ViewsGraph title={"Monthly Views"} data={monthlyViews} />
        </div>
        <div className="sm:col-span-2 flex flex-col gap-4">
          <RecentPostsCard title={"Recent Posts"} posts={[]} />
          <PopularPostsCard title={"Popular Posts"} posts={[]} />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
