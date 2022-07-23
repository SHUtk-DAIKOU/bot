module.exports = (client) => {
    ((client) => {
        //アクティビティを設定
        client.user.setActivity({ name: "SHUtk 代行サービス", type: "WATCHING" });
    })(client);
}