function getNilaiAbjad(input){
    const nilai = parseInt(input)

    if(isNaN(nilai) || nilai < 0 || nilai > 100){
        return 'Nilai tidak valid'
    }else{
        if(nilai >= 85){
            return 'nilai anda: A'
        }else if(nilai >= 70){
            return 'nilai anda: B'
        }else if(nilai >= 55){
            return 'nilai anda: C'
        }else if(nilai >= 40){
            return 'nilai anda: D'
        }else if(nilai >= 25){
            return 'nilai anda: E'
        } else if(nilai >= 0){
            return 'nilai anda: F'
        }
    }
}

module.exports = getNilaiAbjad