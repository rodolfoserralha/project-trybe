SELECT
	c.nome,
    COUNT(h.cancao_id) as reproducoes
FROM
	SpotifyClone.cancao as c
JOIN 
	SpotifyClone.historico as h
ON
	c.id = h.cancao_id
WHERE
	h.usuario_id
IN
	(1, 4, 5)
GROUP BY
	c.nome
ORDER BY c.nome
;