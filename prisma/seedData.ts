 export const seedUserRoles = [
  {
    name: 'admin'
  },
  {
    name: 'cliente'
  }
]


export const seedOrderStatus = [
  {
    name: 'pendiente'
  },
  {
    name: 'entregada'
  },
  ,
  {
    name: 'en revision de transferencia'
  }
]


export const seedPaymentType = [
  {
    name: 'efectivo contra entrega'
  },
  {
    name: 'transferencia'
  }
]

export const seedProduct = [
  {
    title: 'resma de papel',
    slug: 'resma-de-papel',
    description:
      'Esta es una evidente descripcion exageradamente larga para abarcar mucho espacio gracias',
    imageUrl:
      'https://res.cloudinary.com/sheansuke/image/upload/v1651276389/vkzwxojjamwvflph2yxr.jpg',
    price: 200,
    inStock: 2,
    tags: ['resma', 'papel']
  },
  {
    title: 'Caja De Ganchos Para Folders',
    slug: 'caja-de-ganchos-para-folders',
    description:
      'Esta es una evidente descripcion exageradamente larga para abarcar mucho espacio gracias',
    imageUrl:
      'https://res.cloudinary.com/sheansuke/image/upload/v1651439935/sbwcik99owvx3787pgtf.jpg',
    price: 100,
    inStock: 10,
    tags: ['ganchos', 'folders']
  }
]
