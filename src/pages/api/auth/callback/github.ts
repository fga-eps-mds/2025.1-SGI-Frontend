import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string;
  console.log(code)

  if (!code) {
    return res.status(400).json({ error: 'Código de autorização ausente' });
  }

  if (code == 'CODIGO_TESTE') {
    const fakeJwt = 'FAKE.JWT.TOKEN'
    const username = 'TESTE_USER'
    const email = 'TESTE_EMAIL'
    return res.redirect(`/profile?token=${fakeJwt}&username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)
  }

  try {
    // Chamar backend
    const djangoRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/callback?code=${code}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (!djangoRes.ok) {
      const error = await djangoRes.json();
      return res.status(401).json({ error: error.message || 'Falha na autenticação com GitHub' });
    }

    const data = await djangoRes.json();
    const jwt = data.access_token;
    const username = data.username;
    const email = data.email;

    if (!jwt) {
      return res.status(500).json({ error: 'Token JWT não retornado pelo backend' });
    }

    return res.redirect(
        `/profile?token=${jwt}&username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`
    );

  } catch (err: unknown) {
    console.error('[Callback GitHub Error]:', err instanceof Error ? err.message : err);
    res.status(500).json({ error: 'Erro no processo de autenticação' });
  }
}
