SELECT
	MIN(p.valor) as faturamento_minimo,
    MAX(p.valor) as faturamento_maximo,
    ROUND(AVG(p.valor), 2) as faturamento_medio,
    ROUND(SUM(p.valor), 2) as faturamento_total
FROM 
	SpotifyClone.plano as p
JOIN 
	SpotifyClone.usuario as u
ON 
	p.id = u.plano_id
;