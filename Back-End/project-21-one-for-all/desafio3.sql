SELECT 
	s.nome AS usuario,
    COUNT(h.usuario_id) as qtde_musicas_ouvidas,
    ROUND(SUM(c.duracao/ 60), 2) AS total_minutos
FROM 
	SpotifyClone.usuario AS s
JOIN
	SpotifyClone.historico AS h
ON
	s.id = h.usuario_id
JOIN
	SpotifyClone.cancao as c
On
	h.cancao_id = c.id
GROUP BY
	s.nome
ORDER BY
  s.nome;