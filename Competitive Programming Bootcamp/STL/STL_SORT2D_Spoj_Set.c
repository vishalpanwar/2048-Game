/*
Author: Vishal Panwar
Organisation: Coding Blocks
Event: Competitive Programming Bootcamp
*/

#include <iostream>
#include <vector>
#include <algorithm>
#include <cstdio>
#include <cmath>
#include <queue>
#include <cstring>
#include <map>
#include <climits>
#include <set>
#include<list>
#include<string>
#include<string.h>
#include<functional>
typedef long long ll;
#define fast std::ios::sync_with_stdio(false);std::cin.tie(false)
#define endl "\n"
#define abs(a) a >= 0 ? a : -a
#define ll long long int
#define pb push_back
#define MOD (1000000000+7)
#define mod MOD
#define Endl endl

using namespace std;

ll powmod(ll a, int b) { ll res = 1; if (a >= mod)a %= mod; for (; b; b >>= 1){ if (b & 1)res = res*a; if (res >= mod)res %= mod; a = a*a; if (a >= mod)a %= mod; }return res; }
ll gcd(ll a, ll b){ if (a < b)std::swap(a, b); return b == 0 ? a : gcd(b, a % b); }
ll lcm(ll a, ll b){ return ((a*b) / gcd(a, b)); }
int l_bound(int *arr, int lo, int hi, int val){ while (lo <= hi){ int mid = (lo + hi) >> 1; if (arr[mid] >= val)hi = mid - 1; else lo = mid + 1; }return lo; }
int u_bound(int *arr, int lo, int hi, int val){ while (lo <= hi){ int mid = (lo + hi) >> 1; if (arr[mid] > val)hi = mid - 1; else lo = mid + 1; }return hi; }
int bsearch(int *arr, int n, int val){ int lo = 0, hi = n - 1; while (hi >= lo){ int mid = (hi + lo) >> 1; if (arr[mid] == val)return mid; if (arr[mid] > val)hi = mid - 1; else lo = mid + 1; }return -1; }

struct cmp {
    bool operator() (const pair<long ,long> left, const pair<long,long> right){
        if(left.first != right.first)
            return left.first < right.first;
        return left.second < right.second;
    }
};

int main(){
 int n,t;
 long long x,y;
 scanf("%d",&t);
 while(t--){
    scanf("%d",&n);
    set<pair<ll,ll>,cmp> st;
    while(n--){
        scanf("%lld,%lld",&x,&y);
        st.insert(make_pair(x,y));
    }
    for(set<pair<int,int>>::iterator it = st.begin();it != st.end();it++)
        printf("%lld %lld",it->first,it->second);
 }
 return 0;
}


