const cards = document.querySelectorAll(".card-wrapper");

cards.forEach(
card_w => {

  const card = card_w.querySelector(".card");
  const image = card_w.querySelector(".image-card");

  card_w.addEventListener('mousemove', event=>{
   //console.log(card_w.getBoundingClientRect());
   const targetElementId = event.target.id;
  if (targetElementId === "delete"){
  return;
  }
   const [x, y] = [event.offsetX, event.offsetY];
   const rect = card_w.getBoundingClientRect();
   const [width, height] = [rect.width, rect.height];
   const middleX = width / 2;
   const middleY = height / 2;
   const offsetX = ((x - middleX) / middleX) * 25;
   const offsetY = ((y - middleY) / middleY) * 20;
   const offsetX2 = ((x - middleX) / middleX) * 15;
   const offsetY2 = ((y - middleY) / middleY) * 10;
   card.style.setProperty("--rotateX", 1 * offsetX + "deg");
   card.style.setProperty("--rotateY", -1 * offsetY + "deg");
   card.style.setProperty("--posx", offsetX + "%");
   card.style.setProperty("--posy", offsetY + "%");
   image.style.setProperty("--rotateX", 1 * offsetX2 + "deg");
   image.style.setProperty("--rotateY", -1 * offsetY2 + "deg");
   image.style.setProperty("--posx", offsetX2 + "%");
   image.style.setProperty("--posy", offsetY2 + "%");
  });

  card_w.addEventListener('mouseleave', eve=>{
    card.style.animation = 'reset-card 1s ease';
    card.addEventListener("animationend", e=>{
      card.style.animation = 'unset';
      card.style.setProperty("--rotateX", "0deg");
      card.style.setProperty("--rotateY", "0deg");
      card.style.setProperty("--posx", "50%");
      card.style.setProperty("--posy", "50%");
    }, {
      once: true
    });
    image.style.animation = 'reset-card 1s ease';
    image.addEventListener("animationend", e=>{
      image.style.animation = 'unset';
      image.style.setProperty("--rotateX", "0deg");
      image.style.setProperty("--rotateY", "0deg");
      image.style.setProperty("--posx", "50%");
      image.style.setProperty("--posy", "50%");
    }, {
      once: true
    });
  });
});