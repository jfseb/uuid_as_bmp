# uuid_as_bmp
simple example displaying differnet uuid generation strategies

It is apparent that choosing a uuid generation strategy which assures locality
gives drastically different results when using a uuid e.g. as a database key.

https://www.percona.com/blog/2019/11/22/uuids-are-popular-but-bad-for-performance-lets-discuss/




see the pages

(index.html)[../pages/jfseb/uuid_as_bmp/index.html]

Displays a number of


Sources of uuids ( data/v1)


v1  : https://extendsclass.com/uuid-generator.html
v3  :
v4  :
v5  :
abap : ABAP 7.30 Netweaver cl_system_uuid=>CREATE_UUID_C32_STATIC(  ).

See also:

https://www.baeldung.com/java-uuid

https://www.percona.com/blog/2019/11/22/uuids-are-popular-but-bad-for-performance-lets-discuss/
