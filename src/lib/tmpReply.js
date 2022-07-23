module.exports = async (to, content, timeout) => {
    timeout = timeout ?? 5000
    const reply = await to.reply(content);
    setTimeout(() => {
        reply.delete();
        to.delete();
    }, timeout);
}