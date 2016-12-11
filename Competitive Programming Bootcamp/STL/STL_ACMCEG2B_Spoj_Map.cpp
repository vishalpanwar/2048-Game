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

int main(){
    int n,t,x,y;
    string s;
    map<pair<int,int>,string> mp;
    cin>>n;
    for(int i = 0;i<n;i++){
        cin>>x>>y;
        cin>>s;
        if(mp.find(make_pair(x,y)) != mp.end()){
            map<pair<int,int>,string>::iterator it = mp.find(make_pair(x,y));
            mp.erase(it);
            mp.insert(make_pair(make_pair(x,y),s));
        }
        else
            mp.insert(make_pair(make_pair(x,y),s));
    }
    cin>>t;
    while(t--){
        scanf("%d %d",&x,&y);
        cout<<mp[make_pair(x,y)]<<endl;
    }
    return 0;
}

