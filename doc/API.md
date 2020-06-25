<a name="top"></a>
# Test APIDoc v1.0.0

Test generating code document using APIDoc

 - [API](#API)
   - [Accept work order](#Accept-work-order)
   - [Health checking](#Health-checking)
   - [Status of worker](#Status-of-worker)

___


# <a name='API'></a> API

## <a name='Accept-work-order'></a> Accept work order
[Back to top](#top)

```
POST /order
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization | `String` | <p>Authorization Value</p> |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| order_id | `String` | <p>Order ID</p> |
| message | `String` | <p>Message</p> |
| amount | `String` | <p>Amount of the order, e.g. '123.45'</p> |

### Examples
CURL Example:

```curl
curl -i -X POST \
  -H 'Content-type: application/json' \
  -H 'Authorization: Bearer xxxxxxxx' \
  -d '{
    "order_id": "123456",
    "message": "ABCD",
    "amount": "123.45",
  }' \
  http://worker:3000/order
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| status | `String` | <p>status of worker, e.g. available, accepted, wait:...</p> |
| message | `String` | <p>message for displaying to user</p> |

### Success response example

#### Success response example - `Success`

```json
HTTP/1.1 200 OK
{
  "status": "accepted",
  "message": "order 123456 accepted"
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| error | `String` | <p>Error message</p> |

### Error response example

#### Error response example - `Invalid input`

```json
HTTP/1.1 400 Bad Request
{
  "error": "invalid input (order_id=undefined)"
}
```

## <a name='Health-checking'></a> Health checking
[Back to top](#top)

```
GET /
```

### Examples
CURL Example:

```curl
curl -i http://worker:3000/
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| status | `String` | <p>always answer &quot;OK&quot;</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
  "status": "OK"
}
```

## <a name='Status-of-worker'></a> Status of worker
[Back to top](#top)

```
GET /status
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization | `String` | <p>Authorization Value</p> |

### Examples
CURL Example:

```curl
curl -i \
  -H 'Authorization: Bearer xxxxxxxx' \
  http://worker:3000/status
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| status | `String` | <p>status of worker, e.g. available, accepted, wait_for_worker, finished...</p> |

### Success response example

#### Success response example - `Success-available`

```json
HTTP/1.1 200 OK
{
  "status": "available"
}
```

#### Success response example - `Success-transfering`

```json
HTTP/1.1 200 OK
{
  "status": "wait_for_worker"
}
```
