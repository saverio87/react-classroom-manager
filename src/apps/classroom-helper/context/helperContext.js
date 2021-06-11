import { NoteRounded } from "@material-ui/icons";
import React, { createContext, useState, useEffect } from "react";
import firebase from "../../../firebase";

const ClassroomHelperContext = createContext();

const ClassroomHelperProvider = ({ children }) => {
  // Initializing states

  const [allClasses, setAllClasses] = useState();
  const [studentGroups, setStudentGroups] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [absentStudents, setAbsentStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState({
    content: "",
    isOpen: false,
  });
  const [screenOpen, setScreenOpen] = useState({
    content: "",
    isOpen: false,
  });

  // Default state for 'activeTab'
  const [activeTab, setActiveTab] = useState("classroom");
  const [toggleAttendance, setToggleAttendance] = useState(false);
  const [timer, setTimer] = useState(0);

  // Fetch all classrooms data from database

  const classList = firebase
    .firestore()
    .collection("apps")
    .doc("classroom-helper")
    .collection("classes");

  const getClasses = () => {
    setLoading(true);
    classList.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setAllClasses(items);
      setLoading(false);
    });
  };

  // Classrooms, students, notes, etc. CRUD operations

  const addClassroom = (newClassroom) => {
    classList
      .doc(newClassroom.id)
      .set(newClassroom)
      .catch((err) => {
        console.error(err);
      });
  };

  const addStudents = (classroom, studentsToAdd) => {
    classList
      .doc(classroom.id)
      .update({ students: studentsToAdd })
      .catch((err) => {
        console.error(err);
      });

    // updating selectedClass state

    classList.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id === classroom.id) {
          const updatedClass = { ...doc.data() };
          setSelectedClass(doc.data());
        }
      });
    });

    // redirecting to 'classroom' tab

    setActiveTab("classroom");
  };

  const addNote = (classroom, note) => {
    classList
      .doc(classroom.id)
      .update({ notes: firebase.firestore.FieldValue.arrayUnion(note) })
      .catch((err) => {
        console.error(err);
      });

    // updating selectedClass state

    classList.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id === classroom.id) {
          const updatedClass = { ...doc.data() };
          setSelectedClass(doc.data());
        }
      });
    });
  };

  const deleteNote = (classroom, note) => {
    classList
      .doc(classroom.id)
      .update({ notes: firebase.firestore.FieldValue.arrayRemove(note) })
      .catch((err) => {
        console.error(err);
      });

    // updating selectedClass state

    classList.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id === classroom.id) {
          const updatedClass = { ...doc.data() };
          setSelectedClass(doc.data());
        }
      });
    });
  };

  // Dialog handler

  const openDialog = (content) => {
    setDialogOpen({ ...dialogOpen, isOpen: true, content: content });
  };

  const closeDialog = () => {
    setDialogOpen({
      ...dialogOpen,
      isOpen: false,
      content: "",
    });
  };

  // Screen handler

  const openScreen = (content) => {
    setScreenOpen({ ...screenOpen, isOpen: true, content: content });
  };
  const closeScreen = () => {
    setScreenOpen({
      ...screenOpen,
      isOpen: false,
      content: "",
    });
  };

  // BottomBar functionalities

  const pickStudent = (students) => {
    let random = Math.floor(Math.random() * students.length);

    // To make sure that absent students don't get picked

    while (students[random].absent === true) {
      random = Math.floor(Math.random() * students.length);
    }

    const newList = students.map((item, key) => {
      return {
        ...item,
        selected: key == Object.keys(students)[random],
      };
    });

    setSelectedClass({ ...selectedClass, students: newList });
  };
  const pickPair = (students) => {
    const randoms = [];
    let random1 = Math.floor(Math.random() * students.length);
    randoms.push(random1);
    let random2 = Math.floor(Math.random() * students.length);
    while (randoms.includes(random2)) {
      random2 = Math.floor(Math.random() * students.length);
    }
    randoms.push(random2);

    const newList = students.map((item, key) => {
      return {
        ...item,
        selected: randoms.includes(key),
      };
    });

    setSelectedClass({ ...selectedClass, students: newList });
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const groupStudents = (students, studentsPerGroup) => {
    // Filters out students who are absent and creates a shallow copy of the array, with just strings instead of objects
    //

    let studentList = students
      .filter((student) => !student.absent)
      .map((student) => student.name);
    console.log(studentList);
    const shuffledList = shuffleArray(studentList);
    let groups = [],
      i,
      len;

    for (i = 0, len = shuffledList.length; i < len; i += studentsPerGroup) {
      groups.push(shuffledList.slice(i, studentsPerGroup + i));
    }

    setStudentGroups(groups);
  };

  const takeAttendance = (students) => {
    // First we need to unselect student cells that might have
    // been selected (using the student picker function)
    const initialState = students.map((item, key) => {
      return {
        ...item,
        selected: false,
      };
    });

    setSelectedClass({ ...selectedClass, students: initialState });

    setToggleAttendance((toggleAttendance) => !toggleAttendance);
  };

  const toggleAbsence = (students, studentKey) => {
    // Changing the boolean state of the 'absent' property
    // has a twofold purpose:
    // 1. styling purpose (adds overlay to the cell)
    // 2. functional purpose

    const newList = students.map((item, key) => {
      if (studentKey === key) return { ...item, absent: !item.absent };
      return item;
    });

    setSelectedClass({ ...selectedClass, students: newList });
  };

  const setCountDownValue = (time) => {
    const [before, after] = time.split(":");
    console.log(before, after);
    const stringToInteger = parseInt(before) * 60 + parseInt(after);
    setTimer(stringToInteger);
  };

  return (
    <>
      <ClassroomHelperContext.Provider
        value={{
          // Firebase / CRUD
          addClassroom,
          getClasses,
          addStudents,
          addNote,
          deleteNote,
          // Dialog handler
          openDialog,
          closeDialog,
          // Screen handler
          openScreen,
          closeScreen,
          // States
          activeTab,
          setActiveTab,
          allClasses,
          setAllClasses,
          selectedClass,
          setSelectedClass,
          absentStudents,
          setAbsentStudents,
          studentGroups,
          setStudentGroups,
          dialogOpen,
          setDialogOpen,
          toggleAttendance,
          setToggleAttendance,
          screenOpen,
          timer,
          setTimer,
          setScreenOpen,
          loading,
          // handleClick() functionalities
          toggleAbsence,
          // Toolbar functionalities (functions)
          pickStudent,
          pickPair,
          groupStudents,
          setCountDownValue,
          takeAttendance,
        }}
      >
        {children}
      </ClassroomHelperContext.Provider>
    </>
  );
};

export { ClassroomHelperContext, ClassroomHelperProvider };
