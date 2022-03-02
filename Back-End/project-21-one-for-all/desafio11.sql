SELECT
	nome as nome_musica,
CASE
		WHEN nome = 'Dance With Her Own' THEN 'Dance With Trybe'
    WHEN nome = 'Let''s Be Silly' THEN 'Let''s Be Nice'
    WHEN nome = 'Magic Circus' THEN 'Magic Pull Request'
    WHEN nome = 'Troubles Of My Inner Fire' THEN 'Troubles Of My Project'
    WHEN nome = 'Without My Streets' THEN 'Without My Code Review'
END
	AS novo_nome
FROM
	SpotifyClone.cancao
WHERE
	id
IN
	(3, 15, 6, 4, 18)
ORDER BY nome
;