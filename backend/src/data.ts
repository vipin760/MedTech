

const sample_foods: any[] = [
    {
    
      name: 'Pizza Pepperoni',
      cookTime: '10-20',
      price: 10,
      favorite: false,
      origins: ['italy'],
      stars: 4.5,
      imageUrl: 'assets/food-1.jpg',
      tags: ['FastFood', 'Pizza', 'Lunch'],
    },
    {
   
      name: 'Meatball',
      price: 20,
      cookTime: '20-30',
      favorite: true,
      origins: ['persia', 'middle east', 'china'],
      stars: 4.7,
      imageUrl: 'assets/food-2.jpg',
      tags: ['SlowFood', 'Lunch'],
    },
    {
      
      name: 'Hamburger',
      price: 5,
      cookTime: '10-15',
      favorite: false,
      origins: ['germany', 'us'],
      stars: 3.5,
      imageUrl: 'assets/food-3.jpg',
      tags: ['FastFood', 'Hamburger'],
    },
    {
      
      name: 'Fried Potatoes',
      price: 2,
      cookTime: '15-20',
      favorite: true,
      origins: ['belgium', 'france'],
      stars: 3.3,
      imageUrl: 'assets/food-4.jpg',
      tags: ['FastFood', 'Fry'],
    },
    {
      
      name: 'Chicken Soup',
      price: 11,
      cookTime: '40-50',
      favorite: false,
      origins: ['india', 'asia'],
      stars: 3.0,
      imageUrl: 'assets/food-5.jpg',
      tags: ['SlowFood', 'Soup'],
    },
    {
      
      name: 'Vegetables Pizza',
      price: 9,
      cookTime: '40-50',
      favorite: false,
      origins: ['italy'],
      stars: 4.0,
      imageUrl: 'assets/food-6.jpg',
      tags: ['FastFood', 'Pizza', 'Lunch'],
    },
  ]
  export const sample_tags:any[] = [
    { name: 'All', count: 6 },
    { name: 'FastFood', count: 4 },
    { name: 'Pizza', count: 2 },
    { name: 'Lunch', count: 3 },
    { name: 'SlowFood', count: 2 },
    { name: 'Hamburger', count: 1 },
    { name: 'Fry', count: 1 },
    { name: 'Soup', count: 1 },
  ]
  
  export const sample_users: any[] = [
    {
      name: "John Doe",
      email: "john@gmail.com",
      password: "12345",
      address: "Toronto On",
      isAdmin: false,
      isPatient:true,
      isDoctor:false,
      is_blocked:false,
    },
    {
      name: "Jane Doe",
      email: "Jane@gmail.com",
      password: "12345",
      address: "Shanghai",
      isAdmin: false,
      isPatient:false,
      isDoctor:true,
      is_blocked:false,
    },{ 
      name: "admin",
      email: "admin@gmail.com",
      password: "12345",
      address: "Toronto On",
      isAdmin: true,
      isPatient:false,
      isDoctor:false,
      is_blocked:false,
    },
    { 
      name: "patient",
      email: "patient@gmail.com",
      password: "12345",
      address: "Toronto On",
      isAdmin: false,
      isPatient:true,
      isDoctor:false,
      is_blocked:false,
    },{ 
      name: "doctor",
      email: "doctor@gmail.com",
      password: "12345",
      address: "Toronto On",
      isAdmin: false,
      isPatient:false,
      isDoctor:true,
      is_blocked:false,
    },
  ];
  
  export default sample_foods;
  