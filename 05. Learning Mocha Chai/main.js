/*
Program untuk mengkonversi nilai dalam integer ke Abjad A-F
process.exit() tidak perlu
*/ 

const prompt = require('prompt-sync')()
const getNilaiAbjad = require('./getNilaiAbjad')

// let isLanjutkan = true

// while(isLanjutkan){
    const nilai = prompt('Masukkan nilai anda(0-100) : ')
    console.log(getNilaiAbjad(nilai))
    // const errorMsg = testWrongInput(nilai)

    // if (errorMsg) {
    //     console.log(errorMsg)
	// } else {
    //     getNilaiAbjad(nilai)
	// 	isLanjutkan = false
	// }
// }
