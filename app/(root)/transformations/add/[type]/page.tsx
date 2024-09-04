import React from "react";
import Header from "@/components/shared/Header";
import { transformationTypes } from "@/contants";
import TransformationForm from "@/components/shared/TransformationForm";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

const AddTransformationTypePage = async ({
  params: { type },
}: SearchParamProps) => {
  const { userId } = auth();
  const transformation = transformationTypes[type];

  const user = await getUserById(userId!);

  if (!userId) redirect("/sign-in");
  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />
      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user?._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user?.creditBalance}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;
