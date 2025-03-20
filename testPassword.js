
const bcrypt = require('bcrypt');

const storedHashedPassword = "$2b$10$19WLF2PQlAsSK.KtWhcPk.eXnmEJMXXNKPujBiNxt46YP4nRq61Jq" // 🔹 DB에서 가져온 해싱된 비밀번호 넣기!

const newPassword = '1'; // 🔹 테스트할 비밀번호

(async () => {
    const isMatch = await bcrypt.compare(newPassword, storedHashedPassword);
    console.log(isMatch ? "비밀번호 일치!" : "비밀번호 불일치!");
})();
