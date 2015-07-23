SELECT ubicacionSucursal.id_ubicacion,ubicacionSucursal.direccion,ubicacionSucursal.latitud,ubicacionSucursal.longitud,sucursal.id_sucursal,sucursal.nombre,imagenSucursal.imagen,imagenSucursal.imagenMapa,sucursal.id_proveedor,proveedor.nombre AS nmbre_proveedor, ( 3959 * ACOS( COS( RADIANS( $latitud ) ) * COS( RADIANS( ubicacionSucursal.latitud ) ) * COS( RADIANS( ubicacionSucursal.longitud ) - RADIANS( $longitud ) ) + SIN( RADIANS( $latitud ) ) * SIN( RADIANS( ubicacionSucursal.latitud ) ) ) ) AS distance 
FROM ubicacionSucursal
INNER JOIN sucursal ON ubicacionSucursal.id_ubicacion=sucursal.id_ubicacion
INNER JOIN imagenSucursal ON sucursal.id_sucursal=imagenSucursal.id_sucursal
INNER JOIN proveedor ON sucursal.id_proveedor=proveedor.id_proveedor
HAVING distance<$distance
ORDER BY distance