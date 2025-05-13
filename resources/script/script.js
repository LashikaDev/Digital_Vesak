const options = document.getElementById("image_options");
const stamps = document.getElementById("stamps_collection");
const main_image = document.getElementById("card_main_image");
const main_stamp = document.getElementById("card_stamp_image");
const wish = document.getElementById("wish");
const wish_text = document.getElementById("wish_text");
const senderInput = document.getElementById("sender_input");
const receiverInput = document.getElementById("receiver_input");
const senderNameElem = document.querySelector(".sender_name");
const receiverNameElem = document.querySelector(".receiver_name");

options.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    document
      .querySelectorAll(".stamps_collection img")
      .forEach((img) => img.classList.remove("selected"));
    e.target.classList.add("selected");
    main_image.src = e.target.src;
  }
});

stamps.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    document
      .querySelectorAll(".image_options img")
      .forEach((img) => img.classList.remove("selected"));
    e.target.classList.add("selected");
    main_stamp.src = e.target.src;
  }
});


document.getElementById("download_btn").addEventListener("click", () => {
  const cardElement = document.querySelector(".section_card");

  html2canvas(cardElement, { backgroundColor: null, useCORS: true, scale: 5 }).then((canvas) => {
    const link = document.createElement("a");
    link.download = "vesak-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});


const messages = {
  wish_1: [
    "nK ~‹ƒ‹»zpŠ p¥ƒ¥»{p",
    "»K UlªK »lv[ª»zŠ",
    "~§rƒpŠ »N{£ ~‹lŠ ~lpŠ",
    "»p£»N{£ ãYŠ »~£Š l¥{§zŠ",
  ],
  wish_2: [
    "ƒn{»lŠ n¥»pp [ªj",
    "v§j‹ »n~« nƒK Yq",
    "t¥l‹ ~‹l‹pŠ x§lª{ Rn",
    "rlñ ~§u »{~YŠ ~§{",
  ],
  wish_3: [
    "Rv£ [` [z£z£",
    "R{£ [‹j‹ p‹»N{£..!",
    "ƒ»nŠ »~£ŠY ~¹Y£",
    "l¥{§zŠ ãYŠ »p£»N{£..!",
  ],
  wish_4: [
    "»vlŠ Yy¥j£ [ªj",
    "~¥v Rl r¥l‹»M{£..!",
    "»{~YŠ ~n »vpŠ ~¥v",
    "ƒn ~‹~‹z~ »N{£..!",
  ],
  wish_5: [
    "t§ãpŠ tj R¥»~Š{£",
    "r‹pf ~‹l p¥»N{£",
    "»z£Š ~lf xƒrlYŠ ~¥z»~p",
    "»{~YŠ ´pxYŠv »N{£..!",
  ],
  wish_6: [
    "ljŠƒ£{ p¥l‹þ",
    "»»{yxn ãy¥þ",
    "~‹lŠ ~lpŠ rƒpŠ {p",
    "r‹pŠty »{~YŠ v¹[z³xYŠ »N{£..!",
  ],
};

wish.addEventListener("change", function () {
  const selected = wish.value;
  const lines = messages[selected] || [];
  wish_text.innerHTML = lines.map((line) => `<p>${line}</p>`).join("");
});

wish.dispatchEvent(new Event("change"));

senderInput.addEventListener("input", () => {
  senderNameElem.textContent = senderInput.value + " úiska";
});

receiverInput.addEventListener("input", () => {
  receiverNameElem.textContent = receiverInput.value + " fj;";
});


document.querySelector(".reset_button").addEventListener("click", () => {

    document.getElementById("card_main_image").src = "resources/images/card_image_1.jpg";

    document.getElementById("card_stamp_image").src = "resources/images/stamp_image_8.png";

    senderInput.value = "";
    receiverInput.value = "";

    senderNameElem.textContent = "'''''''''''''''''''''''''''''''''''''''''''' úiska";
    receiverNameElem.textContent = "'''''''''''''''''''''''''''''''''''''''''''' fj;";
});


document.querySelector(".share_button").addEventListener("click", async () => {
    const shareText = "Digital Vesak Card";
    const shareUrl = window.location.href;
    const fullMessage = `${shareText} ${shareUrl}`;

    if (navigator.share) {
        try {
            await navigator.share({
                title: "Vesak Card",
                text: shareText,
                url: shareUrl
            });
            console.log("Shared Successfully");
        } catch (err) {
            console.error("Share canceled or failed:", err);
        }
    } else {
        // Fallback: show manual sharing options
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fullMessage)}`;
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        const emailUrl = `mailto:?subject=Greeting Card&body=${encodeURIComponent(fullMessage)}`;

        const shareOptions = `
            WhatsApp: ${whatsappUrl}\n
            Telegram: ${telegramUrl}\n
            Email: ${emailUrl}\n
            (Link copied to clipboard)
        `;
        alert("Sharing Options:\n\n" + shareOptions);
        window.open(whatsappUrl, "_blank");
    }
});
