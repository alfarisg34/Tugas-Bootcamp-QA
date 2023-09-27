/*
Program untuk mengkonversi nilai dalam integer ke Abjad A-F
process.exit() tidak perlu
*/ 

const prompt = require('prompt-sync')()

let yesOrNo = "y";

while(yesOrNo.toLowerCase() != "n"){
    const nilai = prompt('Masukkan nilai anda(0-100) : ')
    if(nilai >= 0 && nilai <=100){
        if(nilai >= 85){
            console.log('nilai anda: A')
        }else if(nilai >= 70){
            console.log('nilai anda: B')
        }else if(nilai >= 55){
            console.log('nilai anda: C')
        }else if(nilai >= 40){
            console.log('nilai anda: D')
        }else if(nilai >= 25){
            console.log('nilai anda: E')
        } else{
            console.log('nilai anda: F')
        }
        yesOrNo = prompt('Apakah anda ingin lanjutkan?(Y/N)')
        while(yesOrNo.toLowerCase() != "n" && yesOrNo.toLowerCase() != "y"){
            console.log("Input anda salah(Y/N)")
            yesOrNo = prompt('Apakah anda ingin lanjutkan?(Y/N)')
        }
    } else{
        console.log("Input anda salah(0-100)")
    }
}
// process.exit()

