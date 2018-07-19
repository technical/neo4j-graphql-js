import { cypherQuery, cypherMutation, augmentSchema } from '../../dist/index';
import { graphql } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { testSchema } from './testSchema';

export function cypherTestRunner(
  t,
  graphqlQuery,
  graphqlParams,
  expectedCypherQuery,
  expectedCypherParams
) {
  const testMovieSchema =
    testSchema +
    `
type Mutation {
    CreateGenre(name: String): Genre @cypher(statement: "CREATE (g:Genre) SET g.name = $name RETURN g")
    CreateMovie(movieId: ID!, title: String, year: Int, plot: String, poster: String, imdbRating: Float): Movie
    AddMovieGenre(moviemovieId: ID!, genrename: String): Movie @MutationMeta(relationship: "IN_GENRE", from:"Movie", to:"Genre")
}
`;

  const resolvers = {
    Query: {
      Movie(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      MoviesByYear(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      MovieById(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      MovieBy_Id(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      GenresBySubstring(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      Books(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      }
    },
    Mutation: {
      CreateGenre(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherMutation(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
        t.end();
      },
      CreateMovie(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherMutation(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
        t.end();
      },
      AddMovieGenre(object, params, ctx, resolveInfo) {
        const [query, queryParams] = cypherMutation(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
        t.end();
      }
    }
  };

  const schema = makeExecutableSchema({
    typeDefs: testMovieSchema,
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  });

  // query the test schema with the test query, assertion is in the resolver
  return graphql(schema, graphqlQuery, null, null, graphqlParams);
}

export function augmentedSchemaCypherTestRunner(
  t,
  graphqlQuery,
  graphqlParams,
  expectedCypherQuery
) {
  //t.plan(1);
  const resolvers = {
    Query: {
      Movie(object, params, ctx, resolveInfo) {
        let [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      MoviesByYear(object, params, ctx, resolveInfo) {
        let [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      MovieById(object, params, ctx, resolveInfo) {
        let [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      MovieBy_Id(object, params, ctx, resolveInfo) {
        let [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      GenresBySubstring(object, params, ctx, resolveInfo) {
        let [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      },
      Books(object, params, ctx, resolveInfo) {
        let [query, queryParams] = cypherQuery(params, ctx, resolveInfo);
        t.is(query, expectedCypherQuery);
        t.deepEqual(queryParams, expectedCypherParams);
      }
    }
  };

  const schema = makeExecutableSchema({
    typeDefs: testSchema,
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  });

  const augmentedSchema = augmentSchema(schema);

  return graphql(augmentedSchema, graphqlQuery, null, null, graphqlParams);
}

export function augmentedSchema() {
  const schema = makeExecutableSchema({
    typeDefs: testSchema,
    //resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  });

  const augmentedSchema = augmentSchema(schema);
  return augmentedSchema;
}
