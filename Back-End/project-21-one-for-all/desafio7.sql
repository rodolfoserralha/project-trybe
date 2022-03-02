SELECT
	a.nome as artista,
    b.nome as album,
    COUNT(u.artista_id) as seguidores
FROM
	SpotifyClone.album as b
JOIN
	SpotifyClone.artista as a
ON
	b.artista_id = a.id
JOIN
	SpotifyClone.artista_usuario as u
ON
	a.id = u.artista_id
GROUP BY
	a.nome, b.nome
ORDER BY seguidores DESC, artista, album
;
