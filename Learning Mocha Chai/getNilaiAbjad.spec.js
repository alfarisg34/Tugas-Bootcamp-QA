const { expect } = require('chai')
const getNilaiAbjad = require('./getNilaiAbjad')

describe('FT_001_KONVERSI_NILAI', function () {
	describe('IPT_001 Cek Input', function () {
		it('Menampilkan \"Nilai tidak valid\" untuk input string', function () {
			const input = 'a'
			const result = getNilaiAbjad(input)
			expect(result).to.equal("Nilai tidak valid")
		})
		it('Menampilkan \"Nilai tidak valid\" untuk input kosong', function () {
			const input = ''
			const result = getNilaiAbjad(input)
			expect(result).to.equal("Nilai tidak valid")
		})
		it('Menampilkan \"Nilai tidak valid\" untuk input karakter', function () {
			const input = '!'
			const result = getNilaiAbjad(input)
			expect(result).to.equal("Nilai tidak valid")
		})
		it('Menampilkan \"Nilai tidak valid\" untuk input lebih dari batas', function () {
			const input = 101
			const result = getNilaiAbjad(input)
			expect(result).to.equal("Nilai tidak valid")
		})
		it('Menampilkan \"Nilai tidak valid\" untuk input kurang dari batas', function () {
			const input = -1
			const result = getNilaiAbjad(input)
			expect(result).to.equal("Nilai tidak valid")
		})
	})
	describe('IPT_002 Konversi nilai', function () {
		it('Menampilkan nilai A untuk nilai >= 85', function () {
			const input = 85 
			const result = getNilaiAbjad(input)
			expect(result).to.equal("nilai anda: A")
		})
		it('Menampilkan nilai B untuk nilai >= 70', function () {
			const input = 70
			const result = getNilaiAbjad(input)
			expect(result).to.equal("nilai anda: B")
		})
		it('Menampilkan nilai C untuk nilai >= 55', function () {
			const input = 55
			const result = getNilaiAbjad(input)
			expect(result).to.equal("nilai anda: C")
		})
		it('Menampilkan nilai D untuk nilai >= 40', function () {
			const input = 40 
			const result = getNilaiAbjad(input)
			expect(result).to.equal("nilai anda: D")
		})
		it('Menampilkan nilai E untuk nilai >= 25', function () {
			const input = 25 
			const result = getNilaiAbjad(input)
			expect(result).to.equal("nilai anda: E")
		})
		it('Menampilkan nilai F untuk nilai >= 0', function () {
			const input = 0
			const result = getNilaiAbjad(input)
			expect(result).to.equal("nilai anda: F")
		})
	})
})