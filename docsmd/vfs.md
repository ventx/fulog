The **V**irtual **F**ile **S**ystem is an internal representation of the actual state of the 
filesystem. Since it would lead to insanely high latencies if you only would finish the operations
after the streaming of the fuse events to ensure consistency of the file system, fulog creates a 
local representation of the filesystem. Once a data changing fuse command comes in, it is thrown on 
an event stream and as soon as it was persisted, we can give feedback and finish the fuse operation.
Streaming comes afterwards and happens asynchronously.