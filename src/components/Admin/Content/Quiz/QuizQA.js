import { useEffect, useState } from "react";
import "./QuizQA.scss";
import Select from "react-select";
import { GrAddCircle } from "react-icons/gr";
import { HiMinusCircle } from "react-icons/hi";
import { BiImageAdd } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import {
  getAllQuizForAdmin,
  getQuizWithQA,
  postCreatNewAnswerForQuestion,
  postCreatNewQuestionForQuiz,
  postUpsertQA,
} from "../../../../services/apiService";
import { toast } from "react-toastify";
import { useImmer } from "use-immer";
import { normalize, schema } from "normalizr";

const QuizQA = (props) => {
  const cauhoiId = uuidv4();
  const dapAnId = uuidv4();

  const [cauHoiObj, setCauHoiObj] = useState({
    [cauhoiId]: {
      id: cauhoiId,
      description: "",
      imageFile: "",
      imageName: "",
      answers: [dapAnId],
    },
  });

  const [dapAnObj, setDapAnObj] = useState({
    [dapAnId]: { id: dapAnId, description: "", isCorrect: false },
  });

  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ];

  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });

  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }
  }, [selectedQuiz]);

  //return a promise that resolves with a File instance
  function urltoFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }
  const fetchQuizWithQA = async () => {
    let rs = await getQuizWithQA(selectedQuiz.value);
    if (rs && rs.EC === 0) {
      //convert base64
      let newQA = [];
      for (let i = 0; i < rs.DT.qa.length; i++) {
        let q = rs.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Question-${q.id}.png`;
          q.imageFile = await urltoFile(
            `data:image/png;base64,${q.imageFile}`,
            `Question-${q.id}.png`,
            "image/png"
          );
        }
        newQA.push(q);
        // }
        // setQuestions(newQA);

        const answer = new schema.Entity("answer");
        const question = new schema.Entity("question", {
          answers: [answer],
        });
        const d = normalize(newQA, [question]);
        console.log(">>>check data", d);
        setCauHoiObj(d.entities.question);
        setDapAnObj(d.entities.answer);
      }
    }
  };

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  const [questions, setQuestions] = useImmer(initQuestions);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let newQuestions = questions.filter((item) => item.id !== id);
      setQuestions(newQuestions);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };

      setQuestions((draft) => {
        let index = draft.findIndex((item) => item.id === questionId);
        draft[index].answers.push(newAnswer);
      });
    }
    if (type === "REMOVE") {
      setQuestions((draft) => {
        let index = draft.findIndex((item) => item.id === questionId);
        draft[index].answers = questions[index].answers.filter(
          (item) => item.id !== answerId
        );
      });
    }
  };

  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let index = questions.findIndex((item) => item.id === questionId);
      if (index > -1) {
        setQuestions((draft) => {
          draft[index].description = value;
        });
      }
    }
  };

  const handleOnChangeFileQuestion = (questionId, event) => {
    let index = questions.findIndex((item) => item.id === questionId);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      setQuestions((draft) => {
        draft[index].imageFile = event.target.files[0];
        draft[index].imageName = event.target.files[0].name;
      });
    }
  };

  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let index = questions.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setQuestions((draft) => {
        draft[index].answers = draft[index].answers.map((answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        });
      });
    }
  };

  const handleSubmitQuestionForQuiz = async () => {
    //todo
    //validate data
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Choose quiz!");
      return;
    }

    //validate question

    let isValidQ = true;
    let indexQ1 = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQ = false;
        indexQ1 = i;
        break;
      }
    }
    if (isValidQ === false) {
      toast.error(`Question ${indexQ1 + 1}`);
      return;
    }

    //validate answer
    let isValidAnswer = true;
    let indexQ = 0,
      indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexA = j;
          break;
        }
      }
      indexQ = i;
      if (isValidAnswer === false) break;
    }
    if (isValidAnswer === false) {
      toast.error(`Answer ${indexA + 1} - Question ${indexQ + 1}`);
      return;
    }

    //submit question
    // await Promise.all(questions.map(async (question) => {
    //     const q = await postCreatNewQuestionForQuiz(
    //         +selectedQuiz.value,
    //         question.description,
    //         question.imageFile
    //     )
    //     // console.log("q", q)
    //     //submit answer
    //     await Promise.all(question.answers.map(async (answer) => {
    //         await postCreatNewAnswerForQuestion(
    //             answer.description,
    //             answer.isCorrect,
    //             q.DT.id
    //         )
    //     }))
    // }))
    let questionsCLone = _.cloneDeep(questions);

    for (let i = 0; i < questions.length; i++) {
      if (questionsCLone[i].imageFile) {
        questionsCLone[i].imageFile = await toBase64(
          questionsCLone[i].imageFile
        );
      }
    }

    let res = await postUpsertQA({
      quizId: selectedQuiz.value,
      questions: questionsCLone,
    });

    if (res && res === 0) {
      toast.success(res.EM);
      fetchQuizWithQA();
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handlePreviewImage = (questionId) => {
    let questionsCLone = _.cloneDeep(questions);
    let index = questionsCLone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setDataImagePreview({
        url: URL.createObjectURL(questionsCLone[index].imageFile),
        title: questionsCLone[index].imageName,
      });
      setIsPreviewImage(true);
    }
  };

  // console.log("questions", questions)

  console.log(">>>check cau hoi:", cauHoiObj);

  const tifOptions = Object.keys(cauHoiObj).map((key, index) => {
    console.log(">>>check object: ", key, "value: ", cauHoiObj[key]);
  });
  return (
    <div className="questions-container">
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>
        <div className="mt-3 mb-2">Add question:</div>
        {Object.keys(cauHoiObj).map((keyQ, index) => {
          return (
            <div className="q-main mb-4" key={keyQ}>
              <div className="questions-content">
                <div className="form-floating description">
                  <input
                    type="type"
                    className="form-control"
                    value={cauHoiObj[keyQ].description}
                    onChange={(event) =>
                      handleOnChange(
                        "QUESTION",
                        cauHoiObj[keyQ].id,
                        event.target.value
                      )
                    }
                  ></input>
                  <label>Question {index + 1} Description</label>
                </div>
                <div className="group-upload">
                  <label htmlFor={`${cauHoiObj[keyQ].id}`}>
                    <BiImageAdd className="label-up"></BiImageAdd>
                  </label>
                  <input
                    id={`${cauHoiObj[keyQ].id}`}
                    onChange={(event) =>
                      handleOnChangeFileQuestion(cauHoiObj[keyQ].id, event)
                    }
                    type={"file"}
                    hidden
                  ></input>
                  <span>
                    {cauHoiObj[keyQ].imageName ? (
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handlePreviewImage(cauHoiObj[keyQ].id)}
                      >
                        {cauHoiObj[keyQ].imageName}
                      </span>
                    ) : (
                      "No file"
                    )}
                  </span>
                </div>
                <div className="btn-add">
                  <span onClick={() => handleAddRemoveQuestion("ADD", "")}>
                    <GrAddCircle className="icon-add" />
                  </span>
                  {questions.length > 1 && (
                    <span
                      onClick={() =>
                        handleAddRemoveQuestion("REMOVE", cauHoiObj[keyQ].id)
                      }
                    >
                      <HiMinusCircle className="icon-remove" />
                    </span>
                  )}
                </div>
              </div>
              {cauHoiObj[keyQ].answers &&
                cauHoiObj[keyQ].answers.length > 0 &&
                cauHoiObj[keyQ].answers.map((keyA, index) => {
                  return (
                    <div key={keyA} className="answers-content">
                      <input
                        className="form-check-input iscorrect"
                        type="checkbox"
                        checked={dapAnObj[keyA].isCorrect}
                        onChange={(event) =>
                          handleAnswerQuestion(
                            "CHECKBOX",
                            dapAnObj[keyA].id,
                            cauHoiObj[keyQ].id,
                            event.target.checked
                          )
                        }
                      />
                      <div className="form-floating description">
                        <input
                          type="type"
                          className="form-control"
                          value={dapAnObj[keyA].description}
                          onChange={(event) =>
                            handleAnswerQuestion(
                              "INPUT",
                              dapAnObj[keyA].id,
                              cauHoiObj[keyQ].id,
                              event.target.value
                            )
                          }
                        ></input>
                        <label>Answers {index + 1}</label>
                      </div>
                      <div className="btn-group">
                        <span
                          onClick={() =>
                            handleAddRemoveAnswer("ADD", cauHoiObj[keyQ].id)
                          }
                        >
                          <GrAddCircle className="icon-add" />
                        </span>
                        {cauHoiObj[keyQ].answers.length > 1 && (
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer(
                                "REMOVE",
                                cauHoiObj[keyQ].id,
                                dapAnObj[keyA].id
                              )
                            }
                          >
                            <HiMinusCircle className="icon-remove" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
        {questions && questions.length > 0 && (
          <div>
            <button
              onClick={() => handleSubmitQuestionForQuiz()}
              className="btn btn-warning"
            >
              Save
            </button>
          </div>
        )}
        {isPreviewImage === true && (
          <Lightbox
            image={dataImagePreview.url}
            title={dataImagePreview.title}
            onClose={() => setIsPreviewImage(false)}
          ></Lightbox>
        )}
      </div>
    </div>
  );
};
export default QuizQA;
