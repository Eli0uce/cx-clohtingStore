//  Default functions

function EnvoieGunware(data) {
  $.post(
    `https://${ConfigDev.NameScript}/${ConfigDev.NameEventCreateSkin}`,
    JSON.stringify({
      data,
    })
  );
}

function EnvoieGunwareTenue(data) {
  $.post(
    `https://${ConfigDev.NameScript}/tenue`,
    JSON.stringify({
      data,
    })
  );
}

window.addEventListener("keydown", function (event) {
  if (event.key === "d") {
    $.post(`https://${ConfigDev.NameScript}/TurnRight`);
  }
  if (event.key === "q") {
    $.post(`https://${ConfigDev.NameScript}/TurnLeft`);
  }

  if (event.key === "ArrowRight") {
    $.post(`https://${ConfigDev.NameScript}/TurnRight`);
  }
  if (event.key === "ArrowLeft") {
    $.post(`https://${ConfigDev.NameScript}/TurnLeft`);
  }
  if (event.key === "ArrowUp") {
    $.post(`https://${ConfigDev.NameScript}/armsup`);
  }
  if (event.key === "ArrowDown") {
    $.post(`https://${ConfigDev.NameScript}/armsdown`);
  }
});

// Buy items or complete costume

const Achat_item_press_btn = document.getElementById("modal-checkout");
const Achat_item_press_btn_all = document.getElementById(
  "modal-checkout-tenue"
);

Achat_item_press_btn.addEventListener("click", () => {
  itemAcheter.forEach((itemInfo) => {
    let tableauxPourLePD = {
      name: itemInfo.name,
      price: itemInfo.price,
      drawable: itemInfo.drawable,
      type: itemInfo.type,
      img: itemInfo.img,
    };

    EnvoieGunware(tableauxPourLePD);
  });
  calculItemPriceTotal = 0;
  itemAcheter = [];
  GetPrice();
  diplayMenuPayment.style.display = "none";
});

Achat_item_press_btn_all.addEventListener("click", () => {
  let skin = [];
  itemAcheter.forEach((itemInfo) => {
    let tableauxPourLePD = {
      name: itemInfo.name,
      price: itemInfo.price,
      drawable: itemInfo.drawable,
      type: itemInfo.type,
      img: itemInfo.img,
    };
    skin.push(tableauxPourLePD);
  });
  EnvoieGunwareTenue(skin);
  calculItemPriceTotal = 0;
  itemAcheter = [];
  GetPrice();
  diplayMenuPayment.style.display = "none";
});
