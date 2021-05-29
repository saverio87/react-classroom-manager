import React, { useEffect, useContext } from "react";
import firebase from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { ClassroomHelperContext } from "./context/helperContext";

export const SubmitClass = () => {
  const { addClassroom } = useContext(ClassroomHelperContext);

  const ref = firebase
    .firestore()
    .collection("apps")
    .doc("classroom-helper")
    .collection("classes");

  const classData = {
    id: uuidv4(),
    name: "Mechanical Engineering 2021",
    icon: "",
    students: [
      { name: "王梦迪", absent: false },
      { name: "吴波", absent: false },
      { name: "徐浩展", absent: false },
      { name: "邢文龙", absent: false },
      { name: "白漓潼", absent: false },
      { name: "仝珈溪", absent: false },
      { name: "徐贺冰", absent: false },
      { name: "李东凝", absent: false },
      { name: "王雨", absent: false },
      { name: "刘鑫", absent: false },
      { name: "沈若冰", absent: false },
      { name: "李婉婷", absent: false },
      { name: "贾美静", absent: false },
      { name: "张慧杰", absent: false },
      { name: "刘雨函", absent: false },
      { name: "杨依霖", absent: false },
      { name: "吴妍妍", absent: false },
      { name: "张一慧", absent: false },
      { name: "任飞帆", absent: false },
      { name: "杨佳莉", absent: false },
      { name: "严雪丽", absent: false },
      { name: "邓长娟", absent: false },
      { name: "司茹", absent: false },
      { name: "王桢", absent: false },
      { name: "白洁", absent: false },
      { name: "申若楠", absent: false },
      { name: "庞舒丹", absent: false },
      { name: "吴英姿", absent: false },
      { name: "王仕雨", absent: false },
      { name: "李佳辰", absent: false },
    ],
    notes: ["I like this class"],
    teacher: "Mr.Sav",
    year: 2021,
  };

  useEffect(() => {
    addClassroom({ ...classData });
  }, []);

  return <div>Class added</div>;
};
