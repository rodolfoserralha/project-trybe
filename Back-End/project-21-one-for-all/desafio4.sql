SELECT
	s.nome AS usuario,
    IF (MAX(YEAR(h.data_reproducao)) = 2021, 'Usuário ativo', 'Usuário inativo') AS condicao_usuario
FROM
	SpotifyClone.usuario as s
JOIN
	SpotifyClone.historico as h
ON
	s.id = h.usuario_id
GROUP BY
	s.nome
ORDER BY
	s.nome
;
