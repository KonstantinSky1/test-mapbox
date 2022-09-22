export default function filterPosts(allPosts, valuesSearch) {
  return allPosts.filter(post => (post.body).toLowerCase().includes(valuesSearch.toLowerCase()) ||
    (post.title).toLowerCase().includes(valuesSearch.toLowerCase()));
}