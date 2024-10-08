import React, { useState } from "react";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);
  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    return { x, y };
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
    const { x, y } = getXY();
    return `Koordinatlar (${x},${y})`;
  }

  function reset() {
    // Tüm stateleri başlangıç değerlerine sıfırlamak için bu helperı kullanın.
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
    const nextIndex = index + yon;
    if (yon === -1 && index % 3 === 0) {
      return index;
    }
    if (yon === 1 && index % 3 === 2) {
      return index;
    }
    if (yon === -3 && index < 3) {
      return index;
    }
    if (yon === 3 && index > 5) {
      return index;
    }
    return nextIndex;
  }

  function ilerle(evt) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
    const direction = evt.target.id;
    let nextIdx;
    switch (direction) {
      case "left":
        nextIdx = sonrakiIndex(-1);
        if (nextIdx === index) {
          setMessage("Sola gidemezsiniz");
        } else {
          setMessage("");
        }
        break;
      case "up":
        nextIdx = sonrakiIndex(-3);
        if (nextIdx === index) {
          setMessage("Yukarıya gidemezsiniz");
        } else {
          setMessage("");
        }
        break;
      case "right":
        nextIdx = sonrakiIndex(1);
        if (nextIdx === index) {
          setMessage("Sağa gidemezsiniz");
        } else {
          setMessage("");
        }
        break;
      case "down":
        nextIdx = sonrakiIndex(3);
        if (nextIdx === index) {
          setMessage("Aşağıya gidemezsiniz");
        } else {
          setMessage("");
        }
        break;
      default:
        nextIdx = index;
    }
    if (nextIdx !== index) {
      setIndex(nextIdx);
      setSteps(steps + 1);
    }
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    evt.preventDefault();
    const { x, y } = getXY();
    console.log({ x, y, steps, email });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 data-testid="coordinates" id="coordinates">
          {getXYMesaj()}
        </h3>
        <h3 data-testid="steps" id="steps">
          {steps} kere ilerlediniz
        </h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            data-testid={`square${idx}`}
            className={`square${idx === index ? " active" : ""}`}
          >
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 data-testid="message" id="message">
          {message}
        </h3>
      </div>
      <div id="keypad">
        <button data-testid="left" id="left" onClick={ilerle}>
          SOL
        </button>
        <button data-testid="up" id="up" onClick={ilerle}>
          YUKARI
        </button>
        <button data-testid="right" id="right" onClick={ilerle}>
          SAĞ
        </button>
        <button data-testid="down" id="down" onClick={ilerle}>
          AŞAĞI
        </button>
        <button data-testid="reset" id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          data-testid="email-input"
          id="email"
          type="email"
          placeholder="email girin"
          value={email}
          onChange={onChange}
        ></input>
        <input data-testid="submit" id="submit" type="submit"></input>
      </form>
    </div>
  );
}
