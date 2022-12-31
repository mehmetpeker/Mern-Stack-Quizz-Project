import React from "react";
import { useNavigate } from "react-router-dom";

function Instructions({ examData, setView, startTimer }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-5">
      <ul className="flex flex-col gap-1">
        <h1 className="text-2xl underline">Talimatlar</h1>
        <li>Sınav {examData.duration} saniye içerisinde tamamlanmalıdır.</li>
        <li>
          Sınav {examData.duration}{" "} saniye sonunda otomatik olarak tamamlanacaktır.
        </li>
        <li>Sınavı tamamladıktan sonra yanıtları değiştiremezsiniz.</li>
        <li>Sayfayı Yenilemeyiniz</li>
        <li>
          <span className="font-bold">"Önceki"</span> ve {" "}
          <span className="font-bold">"Sonraki"</span> butonlarını sorular arasında geçiş yapabilmek için kullanabilirsiniz.
        </li>
        <li>
          Sınavdaki toplam soru sayısı{" "}
          <span className="font-bold">{examData.totalMarks}</span>.
        </li>
        <li>
          Sınavadaki geçer soru sayısı{" "}
          <span className="font-bold">{examData.passingMarks}</span>.
        </li>
      </ul>

      <div className="flex gap-2">
        <button className="primary-outlined-btn"
         onClick={()=>navigate('/')}
        >
              Kapat
        </button>
        <button
          className="primary-contained-btn"
          onClick={() => {
            startTimer();
            setView("questions");
          }}
        >
          Sınava Başla
        </button>
      </div>
    </div>
  );
}

export default Instructions;
