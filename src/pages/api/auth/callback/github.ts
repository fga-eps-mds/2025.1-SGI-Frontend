// api/auth/callback/github.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string;
  console.log(code)

  if (!code) {
    return res.status(400).json({ error: 'Código de autorização ausente' });
  }

  if (code == 'CODIGO_TESTE') {
    const fakeJwt = 'FAKE.JWT.TOKEN'
    return res.redirect('/profile')
  }

  try {
    // Chamar seu Django em /callback
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

    if (!jwt) {
      return res.status(500).json({ error: 'Token JWT não retornado pelo backend' });
    }

    res.status(200).json({ token: jwt });

    res.redirect('/profile');
  } catch (err: any) {
    console.error('[Callback GitHub Error]:', err.message || err);
    res.status(500).json({ error: 'Erro no processo de autenticação' });
  }
}
