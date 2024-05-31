const config = {
    bot : {
        slashCommands: "undefined", // global veya sunucuIDsi yazın - slash olmayacaksa undefined yapın
	    token: "TOKEN", //Bot Tokeniniz
	    prefix: ["."], //komut ön eki
        id: "BOT ID" //bot idsi
    },
    sunucu : {
        type: "java", //sunucu türü java veya bedrock 
 	    ip: "sunucu ip adresi", //sunucu adresi
        port: 25565, //sunucu portu java için varsayılan 25565 bedrock için varsayılan 19132
        site: "Sunucu Sitesi", //sunucu sitesi
        mcindir: "Oyuncuları için 3. parti minecraft indirme linki", //minecraft indirme linki
        vote: "Sunucunuzun Oy linki", //oy verme linki
        isim: "Sunucu ismi", //sunucu ismi
        
    },
    kanal : {
	    aktif: false, //sesli kanalda online gösterme aktif mi(true) olsun kapalı mı(false)
	    id: "Kanal İd", // sunucu online sayısının gözükeceği kanal (ses kanalı)
	    yazi: "• Aktif: {online}/{maxonline}" // kanalda gözükecek yazı || Varsayılan: • Aktif: {online}/{maxonline}
   },
    durum : {
	    mesaj: "{online} Kişi Sunucumuzda" // bot durumunda online sayısı || Varsayılan {online} Kişi Sunucumuzda 
        aktif: true, //durum mesajı aktif mi? true: aktif false: pasif

        // {online} = sunucuda olan oyuncu sayısı
        // {maxonline} = sunucuda olabilecek maksimum oyuncu sayısı

        // Örnek: "Sunucumuzda {online} kişi var" => Sunucumuzda 10 kişi var
        // Örnek: "Sunucumuzda {online}/{maxonline} kişi var" => Sunucumuzda 10/20 kişi var
        // NOT: {online} değişkenini kullanmazsanız 30 saniyede bir durum güncellemesi olayı iptal olur.
        // NOT: {online} değişkenini kullanmazsanız durum mesajı sabit olur.
        // NOT: {online} değişkenini kullanmazsanız {maxonline} değişkenini kullanamazsınız.
        // NOT: {online} değişkenini kullandığınızda 30 saniyede bir durum güncellemesi yapılır.
        // NOT: aktif: false yaptığınız zaman durum mesajı olmaz.
   },
    ticket : {    
        parentOpened: "Talep kanallarının açılacağı kategori", //destek talep kanallarının açılacağı kategorinin idsi

        Category1: "Minecraft Sorunları", //Destek talebi detayı için kategori 3 || Varsayılan: Minecraft Sorunları
        Category2: "Bulduğunuz Buglar", //Destek talebi detayı için kategori 2 || Varsayılan: Bulduğunuz Buglar
        Category3: "Şikayetler", //Destek talebi detayı için kategori 3 || Varsayılan: Şikayetler
          
        roleSupport: "Destek Yetkilisi Rol İD", //Destek talebine bakacak kişilere verilecek rolün idsi
            
        logsTicket: "Destek talepleri log kanal id", //Destek taleplerinin loglanacağı kanal
        ticketChannel: "Destek Talebi Açılacak Kanal İD" //Kullanıcıların destek talebi oluşturacağı kanalın idsi
    },
    oylama: {
        enabled: false, //oylama aktif mi? true: aktif false: pasif
        channelID: "Kullanıcıların Öneri yazabileceği kanal İD", //oylama kanalı
        emoji: "👍", //oylama emoji || Varsayılan: 👍
        emoji2: "👎", //oylama emoji || Varsayılan: 👎
        emoji3: "🤷", //oylama emoji || Varsayılan: 🤷
        altBaslik: { //alt başlık kullanılsın mı?
            enabled: false, //alt başlık kullanılsın mı? true: kullanılsın false: kullanılmasın
            arsivlemeSure: "1440" //alt başlık arşivlenme süresi (1440 dakika sonra [1440 dakika = 1 gün] arşivlenecek)
        } 

    }
}


module.exports = config;
