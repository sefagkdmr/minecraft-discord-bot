const config = {
    bot : {
		token: "NjcxNjcwMTkxMTc5OTU2MjM0.XjATnA.1UlK0A-qsIiHtA9RmY17_fIEqm0", //Bot Tokeniniz
		prefix: ".", //komut ön eki
        id: "671670191179956234" //bot idsi
	},
	sunucu : {
		ip: "play.craftrise.tc", //sunucu adresi
        isim: "BrothersNW" //sunucu ismi
	},
	kanal : {
		id: "957243765217689640", // sunucu online sayısının gözükeceği kanal (ses kanalı)
		yazi: "• Aktif: {online}/{maxonline}" // kanalda gözükecek yazı
	},
	durum : {
		mesaj: "{online} KİŞİ XxxCraft'ta" // bot durumunda online sayısı 
	},
    ticket : {
        
        parentOpened: "617773799739228164", //destek talep kanallarının açılacağı kategorinin idsi
        Category1: "Minecraft Sorunları", //Destek talebi detayı için kategori 3
        Category2: "Bulduğunuz Buglar", //Destek talebi detayı için kategori 2
        Category3: "Şikayetler", //Destek talebi detayı için kategori 3
          
        roleSupport: "553604912152313868", //Destek talebine bakacak kişilere verilecek rolün idsi
            
        logsTicket: "579598511981592586", //Destek taleplerinin loglanacağı kanal
        ticketChannel: "594516422021873665" //Kullanıcıların destek talebi oluşturacağı kanalın idsi
    }
}
module.exports = config