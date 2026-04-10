const image = (fileName) => new URL(`../../images/${fileName}`, import.meta.url).href;

export const siteAssets = {
  hero: image("hero-image.jpg"),
  sale: image("sale-image.jpg"),
  categories: {
    women: image("for women.jpg"),
    men: image("for men.jpg"),
    kids: image("for kids.jpg"),
    accessories: image("for accessories.jpg"),
  },
  gallery: [
    image("card-image1.jpg"),
    image("card-image2.jpg"),
    image("card-image3.jpg"),
    image("card-image4.jpg"),
    image("card-image5.jpg"),
    image("card-image6.jpg"),
    image("card-image7.jpg"),
    image("card-image8.jpg"),
    image("card-image9.jpg"),
    image("card-image10.jpg"),
    image("card-image11.jpg"),
    image("card-image12.jpg"),
  ],
  news: [image("news-image1.jpg"), image("news-image2.jpg"), image("news-image3.jpg")],
};
