

module.exports = (product) => {
  const content = []
//   const image = {
//     image: 'fonts/sampleImage.jpg',
//     fit: [100, 100],
//     pageBreak: 'after'
// }
  const table = {
    body: [
        ['name', 'description', 'brand', 'price'],
        [ `${product.name}`, `${product.description}`, `${product.brand}`, `${product.price}`]
    ]
}

content = [
    {
        text: `Product wishlist`,
        fontSize: 30,
        bold: true
    },
    {
        // image,
        table
    }
]

console.log(content)

return content

}