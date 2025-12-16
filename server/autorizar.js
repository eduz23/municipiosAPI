require("dotenv").config();
const pool = require("./db");

const API_KEY = process.env.API_KEY_SECRET;

async function autenticarApiKey(req, res, next) {
    const API_KEY_FRONT= req.header('minha-chave');
    const result = await pool.query(`select * from public.api_keys where api_key ilike $1`,[API_KEY_FRONT]);

    const hoje = new Date().toISOString().slice(0,10);

    const criado_em = result.rows[0]?.criado_em;

    if(criado_em != hoje){
    await pool.query(`update api_keys set consumo = 0, criado_em = $1 where api_key ilike $2 RETURNING *`,[hoje, API_KEY_FRONT]);
    }

    if(result.rows[0].consumo >= result.rows[0].limite){
        console.log("limite de consumo atingido");
        return res.status(500).json({mensagem: "LIMITE DE CONSUMO ATINGIDO"});
    }

    if(result.rows.length == 1){
        let consumo1 = result.rows[0].consumo;
        consumo1 = consumo1 + 1;
        const consumo = await pool.query(`update public.api_keys set consumo = $1 where api_key ilike $2 RETURNING *`,[consumo1, API_KEY_FRONT]);
        next();
    }else{
        console.log("chave invalida", API_KEY_FRONT);
        return res.status(500).json({mensagem: "CHAVE INVALIDA DA API"});
    }
}

module.exports = autenticarApiKey;