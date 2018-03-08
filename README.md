# fulog
fulog is a lightweight log collection daemon aimed to cope with the log requirements of containerized
environments. The log directories are mounted via fuse in fulog, which will take care of the transport 
to a central collection point. Currently supports s3 and loser as collection endpoints.
It is built around the fantastic [fuse-bindings](https://github.com/mafintosh/fuse-bindings) package from 
@mafintosh

## How to use it
### cli

Probably for most use cases the way to go.
```bash
$ sudo npm install -g @ventx/fulog
$ sudo fulog [options]
```
The recommended way to configure fulog is by providing a configuration json/yaml/ini

You hav to configure two sections, **mounts** and **endpoints**.
Each location you want to manage with fulog needs to be included in mounts. e.g.:

JSON:
```json
{
    "mounts": [
        {
            "path": "/var/log",
            "endpoints": ["s3-collection-1", "loser-cluster-1"],
            "localMirror": "/var/lib/fulog/var/log",
            "exportExisting": true
        },
        {
            "path": "/var/lib/tomcat/logs",
            "endpoints": ["loser-cluster-1"],
            "localMirror": "/var/lib/fulog/var/lib/tomcat/logs"
        }
    ],
    "endpoints": [
        {
            "name": "s3-collection-1",
            "transport": "s3",
            "config": {
                "bucket": "my-log-bucket",
                "mode": "filestream",
                "interval": 10
            }
        },
        {
            "name": "loser-cluster-1",
            "transport": "loser",
            "config": {
                "authentication": {
                    "user": "noname",
                    "pw": "nopasswd"
                },
                "server": ["loser://10.0.5.120", "loser://you.loose.acme.com:8001"]
            }
        }
    ]
}
```

YAML:
```yaml
mounts:
  - path: /var/log
    endpoints:
      - s3-collection-1
      - loser-cluster-1
    localMirror: /var/lib/fulog/var/log
    exportExisting: True
  - path: /var/lib/tomcat/logs
    endpoints:
      - loser-cluster-1
endpoints:
  - name: s3-collection-1
    transport: s3
    config:
      bucket: my-log-bucket
      mode: filestream
      interval: 10
  - name: loser-cluster-1
    transport: loser
    config:
      authentication:
        user: noname
        pw: nopasswd
    server:
      - loser://10.0.5.120
      - loser://you.loose.acme.com:8001
```

INI:
```ini
[mounts]

[mounts.var_log]
path=/var/log
endpoints[]=s3-collection-1
endpoints[]=loser-cluster-1
localMirror=/var/lib/fulog/var/log

[mounts.var_lib_tomcat_logs]
path=/var/lib/tomcat/logs
endpoints[]=loser-cluster-1


[endpoints]

[endpoints.s3-collection-1]
name=s3-collection-1
transport=s3
config.bucket=my-log-bucket
config.mode=filestream
config.interval=10

[endpoints.loser-cluster-1]
name=loser-cluster-1
transport=loser
config.authentication.user=noname
config.authentication.pw=nopasswd
server[]=loser://10.0.5.210
server[]=loser://you.loose.acme.com:8001

```
