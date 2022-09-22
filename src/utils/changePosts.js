export default function changePosts(allPosts) {
  for (let i=0; i<allPosts.length; i++) {
    //убираем перенос строки, чтобы можно было через поиск искать предложения, а не только слова
    allPosts[i].body = allPosts[i].body.replaceAll('\n','');
    //добавляем широту и долготу для маркеров на карте
    allPosts[i].longitude = 76.9286100 - Math.random()/10;
    allPosts[i].latitude = 43.2566700 - Math.random()/10;
  }

  return allPosts;
}