SELECT 
	COUNT(*) as quantidade_musicas_no_historico
FROM 
	SpotifyClone.historico
WHERE 
	usuario_id = 3
;