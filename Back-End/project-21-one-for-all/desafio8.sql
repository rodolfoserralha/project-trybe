SELECT
	a.nome as artista,
    b.nome as album
FROM
	SpotifyClone.album as b
JOIN
	SpotifyClone.artista as a
ON
	b.artista_id = a.id
GROUP BY
	a.nome, b.nome
ORDER BY
	artista DESC
LIMIT 2
;
