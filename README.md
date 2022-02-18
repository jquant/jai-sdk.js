# JAI SDK for NodeJS

## Technologies 

* [Dataframe-js](https://gmousse.gitbooks.io/dataframe-js/content/#dataframe-js)
* [TypeScript](https://github.com/microsoft/TypeScript)
* [Axios](https://www.npmjs.org/package/axios)

# Installation

The source code is currently hosted on GitHub at: [https://github.com/jquant/jai-sdk.js](https://github.com/jquant/jai-sdk.js)

Installing jai-sdk using `npm`:

```npm
npm install jai-sdk.js
```

For more information, here is our [documentation](https://jai-sdk.readthedocs.io/en/latest/).

# [Get your Auth Key](https://jai-sdk.readthedocs.io/en/latest/source/quick_start.html#getting-your-authentication-key)

First, you'll need an Authorization key to use the backend API.

To get a Trial version API using the sdk, fill the values with your information:

```js
const api = new Jai({
  access_token: '<your token>',
});

// to send token to your e-mail

async sendTokenToEmail(){
    const response = await api.getAuthKey({
            email: '',
            firstName: '',
            lastName: '',
            company: '', // <- this field is optional
    });
    return response
}

sendTokenToEmail();
```

If the response code is 201, then you should be receiving an email with your Auth Key.

# Alpha SDK in Node

This version of the module is currently in alpha and may contain errors.

# Methods

This release will cover the methods of maintenance, data display, and analysis.

### Analysis

* [similar](#similar)
* [predict](#predict)

### Data Display

* [names](#names)
* [info](#info)
* [status](#status)
* [fields](#fields)
* [describe](#describe)
* [getDataBaseType](#gdt)
* [filters](#filter)
* [ids](#ids)
* [isValid](#isvalid)

### Maintenance

* [delete](#delete)
* [deleteRawData](#drd)

# Usage
## [similar](#similar)
After fitting your database, you can perform similarity searches in two ways: Based on an existing index of your already included model or using new data.
 #### Parameters of similar:
 * **name**: Database name to perform similarity search operation.
 * **dt**: An array of values or a dataframe, based on dataframe-js
 * **topK**: Number of similar vectors to return for each ID. Default is **5**.
 * **batchSize**: Number of rows that will be processed in each cycle of the method. Default is **16320**

```js
const api = new Jai({
  access_token: '<your token>',
});

async executeSimilar(){
    const df = new DataFrame({
        id: 1,
        field1: 1000, // that is a random value
        field2: 1001
    }, ['id', 'field1', 'field2'])
    
    const response = await api.similar('test', df);
    return response
}

// or use an array of values

async executeSimilar(){
    const response = await api.similar('test', [1000, 1001]);
    return response
}
```

### Result:

```json
[
    {'id': 0, 'distance': 0.0},
    {'id': 1000, 'distance': 2.298321008682251},
    {'id': 1001, 'distance': 2.545339584350586}
]
```

## [predict](#predict)

Return the predict of the supervised model.

 #### Parameters of predict:
 * **name**: Database name to perform similarity search operation.
 * **dt**: A dataframe, based on dataframe-js
 * **batchSize**: Number of rows that will be processed in each cycle of the method. Default is **16320**
 * **predictProba**: Whether or not to return the probabilities of each prediction is it’s a classification. Default is **False**.

```js
const api = new Jai({
  access_token: '<your token>',
});

async executeSimilar(){
    const df = new DataFrame({
        id: 1,
        field1: 1000, // that is a random value
        field2: 1001
    }, ['id', 'field1', 'field2'])
    
    const response = await api.predict('test', df);
    return response
}
```

### Result:

```json
[{
    "id": 0 , 
    "predict": {
        "field1": 0.1, 
        "field2": 0.6
    }
}]
```

## [names](#names)

Retrieves databases already created for the provided Auth Key.

```js
const api = new Jai({
  access_token: '<your token>',
});

const response = await api.names();

```

### Result:

```json
['jai_database', 'jai_selfsupervised', 'jai_supervised']
```

## [info](#info)

Get name and type of each database in your environment.

```js
const api = new Jai({
  access_token: '<your token>',
});

const response = await api.info();
```

### Result:

```table
                        db_name           db_type
0                  jai_database              Text
1            jai_selfsupervised    SelfSupervised
2                jai_supervised        Supervised
```

## [status](#status)

Get the status of your JAI environment when training.

```js
const api = new Jai({
  access_token: '<your token>',
});

const response = await api.status();
```

### Result:

```json
{
    "Task": "Training",
    "Status": "Completed",
    "Description": "Training of database YOUR_DATABASE has ended."
}
```
## [fields](#fields)

Get the table fields for a Supervised/SelfSupervised database.

#### Parameters of fields:
 * **name**:  String with the name of a database in your JAI environment.
```js
const api = new Jai({
  access_token: '<your token>',
}); 

const response = await api.fields('test');
```

### Result:

```json
{
    'id': 0, 
    'feature1': 0.01, 
    'feature2': 'string', 
    'feature3': 0
}
```
## [describe](#describe)

Get the database hyperparameters and parameters of a specific database.

#### Parameters of fields:
 * **name**:  String with the name of a database in your JAI environment.
```js
const api = new Jai({
  access_token: '<your token>',
}); 

const response = await api.describe('test');
```

### Result:

JSON Object with database description.

## [getDataBaseType](#gdt)

Get the database type.

#### Parameters of getDataBaseType:
 * **name**:  String with the name of a database in your JAI environment.
```js
const api = new Jai({
  access_token: '<your token>',
}); 

const response = await api.getDataBaseType('test');
```

### Result:

Return the type of your database as String.

## [filters](#filters)

Gets the valid values of filters.

#### Parameters of filters:
 * **name**:  String with the name of a database in your JAI environment.
```js
const api = new Jai({
  access_token: '<your token>',
}); 

const response = await api.filters('test');
```

### Result:

List of valid filter values.

## [ids](#ids)

Get id information of a given database.

#### Parameters of ids:
 * **name**:  String with the name of a database in your JAI environment.
 * **mode**:  JAIModeEnum with the options COMPLETE, SIMPLE or SUMMARIZED. Default is **SIMPLE**. 
```js
import { JAIModeEnum } from 'jai-sdk.js'

const api = new Jai({
  access_token: '<your token>',
}); 

const response = await api.ids('test', JAIModeEnum.COMPLETE);
```

### Result:

List with the actual ids (mode: ‘complete’) or a summary of ids (‘simple’/’summarized’) of the given database.

## [isValid](#isValid)

Check if a given name is a valid database name (i.e., if it is in your environment).

#### Parameters of isValid:
 * **name**:  String with the name of a database in your JAI environment.
```js
const api = new Jai({
  access_token: '<your token>',
}); 

const response = await api.isValid('test', JAIModeEnum.COMPLETE);
```

### Result:

True if name is in your environment. False, otherwise.

## [delete](#delete)

Delete a database and everything that goes with it (I thank you all).

#### Parameters of delete:
 * **name**:  String with the name of a database in your JAI environment.
```js
const api = new Jai({
  access_token: '<your token>',
}); 

const response = await api.delete('chosen_name');
```

### Result:
```json
'Bombs away! We nuked database chosen_name!'
```

## [deleteRawData](#drd)

Delete raw data. It is good practice to do this after training a model.

#### Parameters of deleteRawData:
 * **name**:  String with the name of a database in your JAI environment.
```js
const api = new Jai({
  access_token: '<your token>',
}); 

const response = await api.deleteRawData('chosen_name');
```

### Result:
```json
'All raw data from database 'chosen_name' was deleted!'
```
