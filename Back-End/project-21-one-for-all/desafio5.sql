SELECT 
	c.nome as cancao,
    COUNT(h.cancao_id) as reproducoes
FROM
	SpotifyClone.cancao as c
JOIN
	SpotifyClone.historico as h
ON
	c.id = h.cancao_id
GROUP BY
	h.cancao_id
ORDER BY 
	reproducoes DESC, cancao ASC
LIMIT 2
;