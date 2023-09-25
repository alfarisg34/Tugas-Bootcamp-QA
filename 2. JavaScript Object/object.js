// - Buat array of object yang terdiri dari beberapa properti (datanya bebas)
// - Filter data berdasarkan properti pada object dan tampilkan hasilnya di console

// Contoh:
// const students = [
// {
//     name: "Harry Potter",
//     age: 18,
// },
// {
//     name: "Hermione Granger",
//     age: 17,
// },
// {
//     name: "Ron Weasley",
//     age: 19,
// },
// ];

// Nama students dengan umur > 17
// ["Harry Potter", "Ron Weasley"] -->

const pets = [
{
    name : "Geboy",
    age : 36,
},
{
    name : "Mochi",
    age : 48,
},
{
    name : "Gusgus",
    age : 3,
},
{
    name : "Zaza",
    age : 12,
},
]

console.log("Kitten")
pets.forEach(myFunction1)
console.log("\n")

// function myFunction(item) {
//     if(item.age>17){
//         console.log(item.name)
//     }
// }

function myFunction1(item) {
    if(item.age<=12){
        console.log(item.name)
    }
}

const filtered = pets
    .filter(pets => pets.age <=12)
    .map(pets => pets.name)
console.log(filtered)