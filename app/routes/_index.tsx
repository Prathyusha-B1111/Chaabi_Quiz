import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Canvas from "~/components/canvas";
import SideNavigation from "../components/sideNavigation";
import { json, useFetcher, useLoaderData } from "@remix-run/react";
import { useCallback, useState } from "react";
import { ActionFunctionArgs } from "@remix-run/node";

export const loader = async () => {
  const response = await fetch(
    "https://672f6460229a881691f2ceca.mockapi.io/quizzes/quiz"
  );

  if (!response.ok) {
    return {
      success: false,
      statusCode: response.status,
      message: response.statusText,
    };
  } else {
    const quizzes = await response.json();
    return {
      success: true,
      data: quizzes,
    };
  }
};

export async function action({ request }: ActionFunctionArgs) {
  const formInputValues = await request.formData();
  const formData = Object.fromEntries(formInputValues);

  if (formData.action === "createData") {
    const fetchs = await fetch(
      "https://672f956866e42ceaf15e27ec.mockapi.io/postQuiz/POSTQUIZ",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData.data,
      }
    );
    const response = await fetchs.json();
    return json(response);
  }

  return json({ message: "Action not matched" });
}

const App = () => {
  const loaderData = useLoaderData();
  const fetcher = useFetcher();
  const [toggleNav, setToggleNav] = useState(true);

  const getPostData = useCallback(
    (data) => {
      console.log("data---", data);

      const result = data
        .filter((item) => item.name === "Question")
        .map((item) => ({
          title: item.question.title,
          options: item.question.options,
          answer: item.question.answer,
          id: item.question.id,
          progress:
            data.find((data) => data.name === "ProgressBar")?.progress || false,
          timer: data.find((data) => data.name === "TimerInput")?.timer || 0,
        }));

      console.log("result", result);

      fetcher.submit(
        {
          action: "createData",
          data: JSON.stringify(result),
        },
        {
          method: "POST",
        }
      );
    },
    [fetcher]
  );

  const toggleNavFun = () => {
    setToggleNav(!toggleNav);
    console.log("click");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-[#655e5e] justify-between">
        <div className="flex">
          {toggleNav && (
            <SideNavigation
              props={loaderData?.data}
              toggleNavProp={toggleNav}
            />
          )}
        </div>
        <div className="w-full p-[20px] pt-0">
          <div className="w-full h-full">
            <Canvas getPostData={getPostData} toggleNavFun={toggleNavFun} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
