const router = require("express").Router();
const Exam = require("../models/examModel");
const authMiddleware = require("../middlewares/authMiddleware");
const Question = require("../models/questionModel");

// Sınav Ekle

router.post("/add", authMiddleware, async (req, res) => {
  try {
    // Girilen exam nesnesinin var olup olmadığını kontrol eder
    const examExists = await Exam.findOne({ name: req.body.name });
    if (examExists) {
      return res
        .status(200)
        .send({ message: "Sınav daha önce eklenmiş", success: false });
    }
    req.body.questions = [];
    const newExam = new Exam(req.body);
    await newExam.save();
    res.send({
      message: "Sınav başarıyla eklendi",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

//Tüm exam bigisini getirir.
router.post("/get-all-exams", authMiddleware, async (req, res) => {
  try {
    const exams = await Exam.find({});
    res.send({
      message: "Sınavlar başarı ile elde edildi",
      data: exams,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// Id bilgisine göre Exam nesnesi döndürür
router.post("/get-exam-by-id", authMiddleware, async (req, res) => {
  try {
    const exam = await Exam.findById(req.body.examId).populate("questions");
    res.send({
      message: "Sınab başarıyla elde edildi",
      data: exam,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// Id bilgisine göre Exam'i günceller
router.post("/edit-exam-by-id", authMiddleware, async (req, res) => {
  try {
    await Exam.findByIdAndUpdate(req.body.examId, req.body);
    res.send({
      message: "Sınav başarıyla güncellendi",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// Id bilgisine göre Exam'i siler
router.post("/delete-exam-by-id", authMiddleware, async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.body.examId);
    res.send({
      message: "Sınav başarı ile silindi",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// Exam koleksiyonuna question ekler

router.post("/add-question-to-exam", authMiddleware, async (req, res) => {
  try {
    // Question koleksiyonuna question ekler
    const newQuestion = new Question(req.body);
    const question = await newQuestion.save();

    // Exam koleksiyonuna question ekler
    const exam = await Exam.findById(req.body.exam);
    exam.questions.push(question._id);
    await exam.save();
    res.send({
      message: "Soru başarıyla eklendi",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// edit question in exam
router.post("/edit-question-in-exam", authMiddleware, async (req, res) => {
  try {
    // Question koleksiyonundaki questionu günceller
    await Question.findByIdAndUpdate(req.body.questionId, req.body);
    res.send({
      message: "Soru başarı ile güncellendi",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});


// delete question in exam
router.post("/delete-question-in-exam", authMiddleware, async (req, res) => {
     try {
        // Questions koleksiyonundaki eşleşen question verisini siler
        await Question.findByIdAndDelete(req.body.questionId);

        // Exam içerisindeki questionı siler
        const exam = await Exam.findById(req.body.examId);
        exam.questions = exam.questions.filter(
          (question) => question._id != req.body.questionId
        );
        await exam.save();
        res.send({
          message: "Soru başarıyla silindi",
          success: true,
        });
     } catch (error) {
      
     }
});


module.exports = router;